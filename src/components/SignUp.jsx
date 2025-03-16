import { useState } from 'react';
import supabase from "../subabase";
import { useNavigate } from 'react-router-dom';

const SignUp = ({onAnmelden}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleSignUp} disabled={loading}>
            {loading ? 'Lädt...' : 'Registrieren & Anmelden'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default SignUp;
