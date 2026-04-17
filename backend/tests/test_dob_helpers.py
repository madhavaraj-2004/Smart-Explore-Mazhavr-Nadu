import unittest
from datetime import date, datetime, timezone

try:
    from backend.routes.auth import _dob_to_response, _dob_to_storage
except ModuleNotFoundError:
    from routes.auth import _dob_to_response, _dob_to_storage


class TestDobHelpers(unittest.TestCase):
    def test_dob_to_storage_from_date(self):
        stored = _dob_to_storage(date(2000, 7, 8))
        self.assertIsInstance(stored, datetime)
        self.assertEqual(stored.year, 2000)
        self.assertEqual(stored.month, 7)
        self.assertEqual(stored.day, 8)
        self.assertIsNotNone(stored.tzinfo)

    def test_dob_to_response_from_datetime(self):
        response_date = _dob_to_response(datetime(2000, 7, 8, tzinfo=timezone.utc))
        self.assertIsInstance(response_date, date)
        self.assertEqual(response_date.isoformat(), '2000-07-08')


if __name__ == '__main__':
    unittest.main()
