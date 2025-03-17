import { useState } from 'react';
import supabase from "../subabase";

const Login = ({onAnmelden}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        setError(null);

        // Falls nötig, Benutzer automatisch anmelden
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (loginError) {
            setError(loginError.message);
        }

        setLoading(false);
        console.log('Erfolgreich angemeldet:', data);
        onAnmelden();
    }

    return(
    	<div className='container mt-4'>
            <h2 className="text-info bg-dark p-2 text-center">Anmelden</h2>
            <form onSubmit={handleLogin}>            
                <div className="mb-3">
                    <label htmlFor="email" className="mb-1 w-100 p-1 bg-primary text-light rounded">
                        Email
                    </label>
                    <input type="text" autoComplete="username" required placeholder="Email" className="form-control border border-primary" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="mb-1 w-100 p-1 bg-primary text-light rounded">
                        Kennwort
                    </label>
                    <input type="password" autoComplete="current-password" required placeholder="Passwort" className="form-control border border-primary" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="w-100 rounded btn btn-primary" disabled={loading}>
                    {loading ? 'Lädt...' : 'Anmelden'}
                </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default Login;