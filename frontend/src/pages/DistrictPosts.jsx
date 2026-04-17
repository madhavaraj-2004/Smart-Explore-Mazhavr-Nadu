import { useEffect, useMemo, useState } from 'react';
import {
  createDistrictPost,
  deleteDistrictPost,
  fetchDistrictPosts,
  updateDistrictPost,
} from '../api/districtPostsApi';
import './DistrictPosts.css';

const DISTRICT_OPTIONS = ['All', 'Salem', 'Dharmapuri', 'Krishnagiri', 'Namakkal'];

const defaultForm = {
  district: 'Salem',
  title: '',
  description: '',
  image: null,
};

function DistrictPosts() {
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [message, setMessage] = useState('');

  const filteredDistrict = useMemo(() => (selectedDistrict === 'All' ? '' : selectedDistrict), [selectedDistrict]);

  const loadPosts = async (district) => {
    setLoading(true);
    setMessage('');
    try {
      const data = await fetchDistrictPosts(district);
      setPosts(data);
    } catch (error) {
      setMessage(error?.response?.data?.detail || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(filteredDistrict);
  }, [filteredDistrict]);

  const onInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'image') {
      setForm((prev) => ({ ...prev, image: files?.[0] || null }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      if (editingId) {
        await updateDistrictPost(editingId, form);
        setMessage('Post updated successfully');
      } else {
        await createDistrictPost(form);
        setMessage('Post created successfully');
      }

      resetForm();
      await loadPosts(filteredDistrict);
    } catch (error) {
      setMessage(error?.response?.data?.detail || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (post) => {
    setEditingId(post.id);
    setForm({
      district: post.district,
      title: post.title,
      description: post.description,
      image: null,
    });
    setMessage('Editing selected post');
  };

  const onDelete = async (postId) => {
    setMessage('');
    try {
      await deleteDistrictPost(postId);
      setMessage('Post deleted successfully');
      await loadPosts(filteredDistrict);
    } catch (error) {
      setMessage(error?.response?.data?.detail || 'Failed to delete post');
    }
  };

  return (
    <section className="district-posts-page">
      <header className="district-posts-header">
        <h1>District Stories</h1>
        <p>Create and manage district content with image uploads.</p>
      </header>

      <div className="district-dropdown-wrap">
        <label htmlFor="district-filter">District Navigation</label>
        <select
          id="district-filter"
          value={selectedDistrict}
          onChange={(event) => setSelectedDistrict(event.target.value)}
        >
          {DISTRICT_OPTIONS.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      <form className="district-posts-form" onSubmit={onSubmit}>
        <h2>{editingId ? 'Update Post' : 'Create Post'}</h2>

        <div className="form-grid">
          <label>
            District
            <select name="district" value={form.district} onChange={onInputChange} required>
              {DISTRICT_OPTIONS.filter((d) => d !== 'All').map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </label>

          <label>
            Title
            <input name="title" value={form.title} onChange={onInputChange} minLength={2} required />
          </label>

          <label className="description-field">
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={onInputChange}
              rows={4}
              minLength={2}
              required
            />
          </label>

          <label>
            Image Upload
            <input name="image" type="file" accept="image/png,image/jpeg,image/webp" onChange={onInputChange} />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : editingId ? 'Update Post' : 'Create Post'}
          </button>
          {editingId ? (
            <button type="button" className="secondary" onClick={resetForm}>
              Cancel Edit
            </button>
          ) : null}
        </div>
      </form>

      {message ? <p className="status-message">{message}</p> : null}

      <section className="posts-list">
        <h2>Stored Posts</h2>
        {loading ? <p>Loading posts...</p> : null}
        {!loading && posts.length === 0 ? <p>No posts available.</p> : null}

        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              {post.image_data_url ? <img src={post.image_data_url} alt={post.title} loading="lazy" /> : null}
              <h3>{post.title}</h3>
              <p className="meta">{post.district}</p>
              <p>{post.description}</p>

              <div className="post-card-actions">
                <button type="button" onClick={() => onEdit(post)}>
                  Edit
                </button>
                <button type="button" className="danger" onClick={() => onDelete(post.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default DistrictPosts;
