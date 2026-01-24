import React, { useEffect } from 'react';

function AsciinemaDemo() {
    useEffect(() => {
        // Load the asciinema player script for Method 3 with autoplay
        const script = document.createElement('script');
        script.src = 'https://asciinema.org/a/405507.js';
        script.id = 'asciicast-405507';
        script.async = true;

        // Enable autoplay and loop for a seamless experience
        script.setAttribute('data-autoplay', 'true');
        script.setAttribute('data-loop', 'true');
        script.setAttribute('data-speed', '1.5'); // Slightly faster playback

        const playerContainer = document.getElementById('player-container');
        if (playerContainer) {
            playerContainer.appendChild(script);
        }

        return () => {
            // Cleanup
            if (playerContainer && playerContainer.contains(script)) {
                playerContainer.removeChild(script);
            }
        };
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '40px 20px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: '2.5rem',
                    marginBottom: '20px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                    Asciinema Integration Demo
                </h1>
                <p style={{
                    color: 'rgba(255,255,255,0.9)',
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    marginBottom: '50px'
                }}>
                    Compare the 3 different methods to display terminal recordings
                </p>

                {/* Method 1: Direct Link */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '30px',
                    marginBottom: '30px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}>
                    <h2 style={{
                        color: '#667eea',
                        marginTop: 0,
                        fontSize: '1.8rem',
                        borderBottom: '3px solid #667eea',
                        paddingBottom: '10px'
                    }}>
                        Method 1: Direct Link 🔗
                    </h2>
                    <p style={{ color: '#666', marginBottom: '20px' }}>
                        A simple hyperlink to the recording. Click to open in a new tab.
                    </p>
                    <a
                        href="https://asciinema.org/a/405507"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            background: '#667eea',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                        }}
                    >
                        View Terminal Recording →
                    </a>
                    <div style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: '#f5f5f5',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                        overflowX: 'auto'
                    }}>
                        <strong>Code:</strong><br />
                        <code>https://asciinema.org/a/405507</code>
                    </div>
                </div>

                {/* Method 2: Image Link */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '30px',
                    marginBottom: '30px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}>
                    <h2 style={{
                        color: '#764ba2',
                        marginTop: 0,
                        fontSize: '1.8rem',
                        borderBottom: '3px solid #764ba2',
                        paddingBottom: '10px'
                    }}>
                        Method 2: Image Link 🖼️
                    </h2>
                    <p style={{ color: '#666', marginBottom: '20px' }}>
                        Shows a preview image (SVG) that links to the recording. Perfect for READMEs!
                    </p>
                    <a
                        href="https://asciinema.org/a/405507"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'block', marginBottom: '20px' }}
                    >
                        <img
                            src="https://asciinema.org/a/405507.svg"
                            alt="Terminal Recording"
                            style={{
                                maxWidth: '100%',
                                border: '2px solid #ddd',
                                borderRadius: '8px',
                                transition: 'transform 0.2s, box-shadow 0.2s'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </a>
                    <div style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: '#f5f5f5',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        overflowX: 'auto'
                    }}>
                        <strong>HTML Code:</strong><br />
                        <code style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                            {`<a href="https://asciinema.org/a/405507" target="_blank">
  <img src="https://asciinema.org/a/405507.svg"/>
</a>`}
                        </code>
                        <br /><br />
                        <strong>Markdown Code:</strong><br />
                        <code>[![asciicast](https://asciinema.org/a/405507.svg)](https://asciinema.org/a/405507)</code>
                    </div>
                </div>

                {/* Method 3: Embedded Player */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '30px',
                    marginBottom: '30px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}>
                    <h2 style={{
                        color: '#e74c3c',
                        marginTop: 0,
                        fontSize: '1.8rem',
                        borderBottom: '3px solid #e74c3c',
                        paddingBottom: '10px'
                    }}>
                        Method 3: Embedded Player ▶️ (Auto-Playing)
                    </h2>
                    <p style={{ color: '#666', marginBottom: '20px' }}>
                        Full interactive player embedded directly in your page with <strong>autoplay</strong> and <strong>loop</strong> enabled. The recording starts automatically and loops continuously for a seamless experience!
                    </p>
                    <div
                        id="player-container"
                        style={{
                            background: '#000',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                        }}
                    />
                    <div style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: '#f5f5f5',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        overflowX: 'auto'
                    }}>
                        <strong>Code (with autoplay & loop):</strong><br />
                        <code style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                            {`<script src="https://asciinema.org/a/405507.js" 
        id="asciicast-405507" 
        async="true"
        data-autoplay="true"
        data-loop="true"
        data-speed="1.5">
</script>`}
                        </code>
                    </div>
                </div>

                {/* Comparison Table */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '30px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}>
                    <h2 style={{
                        color: '#2c3e50',
                        marginTop: 0,
                        fontSize: '1.8rem',
                        borderBottom: '3px solid #2c3e50',
                        paddingBottom: '10px'
                    }}>
                        Comparison & Use Cases 📊
                    </h2>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        marginTop: '20px'
                    }}>
                        <thead>
                            <tr style={{ background: '#f8f9fa' }}>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Method</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Best For</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Pros</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Cons</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold' }}>1. Direct Link</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Emails, messages, simple sharing</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Simple, lightweight</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>No preview</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold' }}>2. Image Link</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>GitHub READMEs, documentation</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Visual preview, works everywhere</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Requires click to play</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '12px', fontWeight: 'bold' }}>3. Embedded Player</td>
                                <td style={{ padding: '12px' }}>Your own website, blog posts</td>
                                <td style={{ padding: '12px' }}>Full interactive experience</td>
                                <td style={{ padding: '12px' }}>Requires script support</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AsciinemaDemo;
