import { useState } from 'react';
import supabase from "../subabase";

const SignUp = ({onAnmelden}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSignUp = async () => {
        setLoading(true);
        setError(null);

        // Benutzer registrieren
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        // Falls nötig, Benutzer automatisch anmelden
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (loginError) {
            setError(loginError.message);
        }

        setLoading(false);
        console.log('Erfolgreich registriert & angemeldet:', data);
        onAnmelden();
    };

    return (
        <div>
            <h2>Registrieren</h2>
            <form onSubmit={handleSignUp}>            
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
                {/* <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} /> */}
                <button type="submit" className="w-100 rounded btn btn-primary" disabled={loading}>
                    {loading ? 'Lädt...' : 'Registrieren & Anmelden'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default SignUp;
