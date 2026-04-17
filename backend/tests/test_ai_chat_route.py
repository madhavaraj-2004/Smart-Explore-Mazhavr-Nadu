import unittest
from unittest.mock import patch

try:
    from backend.routes import ai
except ModuleNotFoundError:
    from routes import ai


class TestAIChatRoute(unittest.TestCase):
    def setUp(self):
        self.dataset = (
            {'prompt': 'What are the best places in Salem?', 'completion': 'Visit Yercaud, Mettur Dam, and the Kottai Mariamman Temple.'},
            {'prompt': 'Tell me about Namakkal temples', 'completion': 'Namakkal Rock Fort and Anjaneyar Temple are popular picks.'},
            {'prompt': 'Any festivals in Dharmapuri?', 'completion': 'Hogenakkal-related seasonal events and local temple festivals are notable.'},
            {'prompt': 'Where can I find mango orchards?', 'completion': 'Krishnagiri is well known for seasonal mango produce.'},
        )

    def test_search_dataset_returns_top_three_matches(self):
        matches = ai.search_data('Salem temples and festivals', self.dataset, limit=3, min_score=10)

        self.assertEqual(len(matches), 3)
        prompts = [item['prompt'] for item in matches]
        self.assertIn('What are the best places in Salem?', prompts)

    def test_search_data_matches_partial_keywords(self):
        college_dataset = (
            {'prompt': 'Salem college engineering sona college salem', 'completion': 'Sona College is a major engineering college in Salem.'},
            {'prompt': 'Namakkal schools and education institutes', 'completion': 'Namakkal has multiple schools and coaching centers.'},
        )

        matches = ai.search_data('salem college', college_dataset, limit=3, min_score=25)
        self.assertGreaterEqual(len(matches), 1)
        self.assertEqual(matches[0]['completion'], 'Sona College is a major engineering college in Salem.')

    def test_search_dataset_handles_typos_with_fuzzy_matching(self):
        typo_dataset = (
            {'prompt': 'Tell me about Yercaud attractions', 'completion': 'Yercaud offers viewpoints and lake activities.'},
            {'prompt': 'What can I see in Namakkal?', 'completion': 'Visit the fort and temples.'},
        )

        matches = ai.search_data('yercud places', typo_dataset, limit=3, min_score=35)
        self.assertEqual(len(matches), 1)
        self.assertEqual(matches[0]['prompt'], 'Tell me about Yercaud attractions')

    def test_chat_returns_best_completion_for_match(self):
        with (
            patch.object(ai, '_load_dataset', return_value=self.dataset),
        ):
            response = ai.ai_chat(ai.AIChatRequest(message='Suggest places in Salem'))

        self.assertEqual(
            response.model_dump(),
            {'reply': 'Visit Yercaud, Mettur Dam, and the Kottai Mariamman Temple.'},
        )

    def test_chat_returns_no_relevant_data_for_no_match(self):
        with (
            patch.object(ai, '_load_dataset', return_value=self.dataset),
        ):
            response = ai.ai_chat(ai.AIChatRequest(message='How is the weather today?'))

        self.assertEqual(response.model_dump(), {'reply': 'No relevant data found'})

    def test_required_short_inputs_map_to_expected_records(self):
        keyword_dataset = (
            {'prompt': 'salem college engineering sona college salem', 'completion': 'Salem engineering and college info.'},
            {'prompt': 'dharmapuri engineering colleges and technical institutes', 'completion': 'Dharmapuri engineering info.'},
            {'prompt': 'namakkal school education and higher secondary schools', 'completion': 'Namakkal school info.'},
            {'prompt': 'krishnagiri polytechnic diploma institutes', 'completion': 'Krishnagiri polytechnic info.'},
        )

        with (
            patch.object(ai, '_load_dataset', return_value=keyword_dataset),
        ):
            salem = ai.ai_chat(ai.AIChatRequest(message='salem college'))
            dharmapuri = ai.ai_chat(ai.AIChatRequest(message='dharmapuri engineering'))
            namakkal = ai.ai_chat(ai.AIChatRequest(message='namakkal school'))
            krishnagiri = ai.ai_chat(ai.AIChatRequest(message='krishnagiri polytechnic'))

        self.assertEqual(salem.reply, 'Salem engineering and college info.')
        self.assertEqual(dharmapuri.reply, 'Dharmapuri engineering info.')
        self.assertEqual(namakkal.reply, 'Namakkal school info.')
        self.assertEqual(krishnagiri.reply, 'Krishnagiri polytechnic info.')

    def test_chat_handles_misspelled_inputs(self):
        typo_dataset = (
            {'prompt': 'namakkal school education and higher secondary schools', 'completion': 'Namakkal school info.'},
        )

        with (
            patch.object(ai, '_load_dataset', return_value=typo_dataset),
        ):
            response = ai.ai_chat(ai.AIChatRequest(message='namakal schol'))

        self.assertEqual(
            response.reply,
            'Namakkal school info.',
        )


if __name__ == '__main__':
    unittest.main()