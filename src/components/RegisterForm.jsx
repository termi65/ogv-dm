import { useState } from 'react';
import supabase from "../subabase";
import Dialog from './Dialog';

const RegisterForm = ({onAnmelden}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCopy, setPasswordCopy] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    
    const [showModal, setShowModal] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        setError(null);
        setMessage(null);
        if (password != passwordCopy) {
            setShowModal(true);
            return;
        }
        
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setError(error.message);
        } else {
            setMessage("Einladungs-E-Mail wurde gesendet! Bitte überprüfe deine E-Mails zur Bestätigung.");
        }
        setLoading(false);
        setTimeout(function() {
            // Code, der erst nach 2 Sekunden ausgeführt wird
            onAnmelden();
          }, 2000);;

    };

    return (
        <div>
            <h2>Registrieren</h2>
            <form onSubmit={handleRegister}>            
                <div className="mb-3">
                    <label htmlFor="email" className="mb-1 w-100 p-1 bg-primary text-light rounded">
                        Email
                    </label>
                    <input type="text" 
                        autoComplete="username"
                        required
                        placeholder="Email"
                        className="form-control border border-primary"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="mb-1 w-100 p-1 bg-primary text-light rounded">
                        Kennwort
                    </label>
                    <input type="password"
                        autoComplete="new-password"
                        required
                        placeholder="Kennwort"
                        className="form-control border border-primary"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordCopy" className="mb-1 w-100 p-1 bg-primary text-light rounded">
                        Kennwort
                    </label>
                    <input type="password"
                        autoComplete="new-password"
                        required
                        placeholder="Kennwort bestätigen"
                        className="form-control border border-primary"
                        id="passwordCopy"
                        value={passwordCopy}
                        onChange={e => setPasswordCopy(e.target.value)} />
                </div>
                <button type="submit" className="w-100 rounded btn btn-primary" disabled={loading}>
                    {loading ? 'Lädt...' : 'Registrieren'}
                </button>
            </form>
            {error && <p className='text-danger'>{error}</p>}
            {message && <p className='text-light bg-dark'>{message}</p>}

            <Dialog show={showModal}
                title='Achtung!'
                text='Kennwörter stimmen nicht überein, bitte neu eingeben!'
                nurOK={true}
                handleClose={() => setShowModal(false)}
                handleOK={() => setShowModal(false)}/>

        </div>
    );
}

export default RegisterForm;
