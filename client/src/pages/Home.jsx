import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="animate-fade-in">
            <section style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '600px',
                textAlign: 'center',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <h1 style={{
                    fontSize: '4rem',
                    fontWeight: '800',
                    lineHeight: '1.1',
                    margin: 0,
                    background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 40px rgba(165, 180, 252, 0.2)'
                }}>
                    Next Gen Commerce
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px' }}>
                    Experience the future of shopping with our premium collection of curated items. Designed for those who appreciate quality.
                </p>
                <Link to="/shop">
                    <button className="glass-button" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
                        Start Shopping <ArrowRight size={20} />
                    </button>
                </Link>
            </section>

            {/* Featured Section */}
            <section style={{ padding: '80px 0' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '40px' }}>Featured Collection</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="glass-panel" style={{ padding: '20px', transition: 'transform 0.3s' }}>
                            <div style={{ height: '220px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '20px' }}></div>
                            <h3 style={{ margin: '0 0 10px 0' }}>Premium Product {item}</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>$299.00</span>
                                <button className="glass-button" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Add</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
