import { useState } from 'react';
import { Package, Users, DollarSign, Activity } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Icon color="white" size={24} />
            </div>
            <div>
                <p style={{ margin: '0 0 5px 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{title}</p>
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{value}</h3>
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in">
            <h1 style={{ marginBottom: '30px' }}>Admin Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <StatCard title="Total Sales" value="$12,450" icon={DollarSign} color="rgba(16, 185, 129, 0.5)" />
                <StatCard title="Active Users" value="1,234" icon={Users} color="rgba(99, 102, 241, 0.5)" />
                <StatCard title="Total Products" value="45" icon={Package} color="rgba(245, 158, 11, 0.5)" />
                <StatCard title="Conversion Rate" value="2.4%" icon={Activity} color="rgba(236, 72, 153, 0.5)" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
                <div className="glass-panel" style={{ padding: '25px' }}>
                    <h3>Recent Orders</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                                <th style={{ padding: '10px' }}>Order ID</th>
                                <th style={{ padding: '10px' }}>Customer</th>
                                <th style={{ padding: '10px' }}>Status</th>
                                <th style={{ padding: '10px' }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5].map((order) => (
                                <tr key={order} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '15px 10px' }}>#ORD-00{order}</td>
                                    <td style={{ padding: '15px 10px' }}>John Doe</td>
                                    <td style={{ padding: '15px 10px' }}>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            background: 'rgba(16, 185, 129, 0.2)',
                                            color: '#34d399',
                                            fontSize: '0.85rem'
                                        }}>Completed</span>
                                    </td>
                                    <td style={{ padding: '15px 10px' }}>$120.00</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
