import React, { useState, useEffect } from 'react';
import './ImageGrid.css';

const ImageGrid = ({ onNavigate }) => {
    const [images, setImages] = useState({
        q1: null,
        q2: null,
        q3: null,
        q4: null
    });

    const [loading, setLoading] = useState({
        q1: true,
        q2: true,
        q3: true,
        q4: true
    });

    const [categories, setCategories] = useState({
        q1: 'picsum',
        q2: 'nature',
        q3: 'dogs',
        q4: 'cats'
    });

    const fetchImage = async (quadrant, categoryOverride = null) => {
        setLoading(prev => ({ ...prev, [quadrant]: true }));
        let url = '';
        const category = categoryOverride || categories[quadrant];

        try {
            const timestamp = new Date().getTime();

            switch (category) {
                case 'picsum': // Random (Picsum)
                    url = `https://picsum.photos/seed/${timestamp}/800/800`;
                    break;
                case 'nature': // Nature (Lorem Flickr)
                    url = `https://loremflickr.com/800/800/nature?random=${timestamp}`;
                    break;
                case 'city': // City (Lorem Flickr)
                    url = `https://loremflickr.com/800/800/city?random=${timestamp}`;
                    break;
                case 'tech': // Tech (Lorem Flickr)
                    url = `https://loremflickr.com/800/800/technology?random=${timestamp}`;
                    break;
                case 'dogs': // Dog API
                    const dogRes = await fetch('https://dog.ceo/api/breeds/image/random');
                    const dogData = await dogRes.json();
                    url = dogData.message;
                    break;
                case 'cats': // Cat API
                    const catRes = await fetch('https://api.thecatapi.com/v1/images/search');
                    const catData = await catRes.json();
                    url = catData[0].url;
                    break;
                default:
                    url = `https://picsum.photos/seed/${timestamp}/800/800`;
                    break;
            }

            // Preload image to avoid flickering
            const img = new Image();
            img.src = url;
            img.onload = () => {
                setImages(prev => ({ ...prev, [quadrant]: url }));
                setLoading(prev => ({ ...prev, [quadrant]: false }));
            };
            img.onerror = () => {
                console.error(`Failed to load image for ${quadrant}`);
                setLoading(prev => ({ ...prev, [quadrant]: false }));
            };
        } catch (error) {
            console.error(`Error fetching image for ${quadrant}:`, error);
            setLoading(prev => ({ ...prev, [quadrant]: false }));
        }
    };

    useEffect(() => {
        // Initial fetch
        Object.keys(categories).forEach(q => fetchImage(q));
    }, []);

    const handleCategoryChange = (quadrant, newCategory) => {
        setCategories(prev => ({ ...prev, [quadrant]: newCategory }));
        fetchImage(quadrant, newCategory);
    };

    const renderQuadrant = (id) => (
        <div className="grid-cell">
            {loading[id] && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            {images[id] && (
                <img
                    src={images[id]}
                    alt={categories[id]}
                    className={`grid-image ${loading[id] ? 'loading' : ''}`}
                />
            )}

            <select
                className="category-select"
                value={categories[id]}
                onChange={(e) => handleCategoryChange(id, e.target.value)}
                disabled={loading[id]}
            >
                <option value="picsum">🎲 Random</option>
                <option value="nature">🌿 Nature</option>
                <option value="city">🏙️ City</option>
                <option value="tech">💻 Tech</option>
                <option value="dogs">🐶 Dogs</option>
                <option value="cats">🐱 Cats</option>
            </select>

            <button
                className="refresh-btn"
                onClick={() => fetchImage(id)}
                disabled={loading[id]}
                aria-label={`Refresh ${id}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 4v6h-6"></path>
                    <path d="M1 20v-6h6"></path>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
            </button>
        </div>
    );

    return (
        <div className="image-grid-container">
            {renderQuadrant('q1')}
            {renderQuadrant('q2')}
            {renderQuadrant('q3')}
            {renderQuadrant('q4')}
            <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                <button onClick={() => onNavigate('home')} className="btn" style={{ background: 'rgba(255, 255, 255, 0.85)', color: '#333', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>Back to Home</button>
            </div>
        </div>
    );
};

export default ImageGrid;
