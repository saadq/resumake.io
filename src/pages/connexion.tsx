import React, { useState } from 'react';
import axios from 'axios';
import { saveToken } from '../token/token';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleLogin = async () => {
    try {
      // Assuming your Laravel API is running at http://127.0.0.1:8000
      const apiUrl = 'http://127.0.0.1:8000/api/login';
     
      const response = await axios.post(apiUrl, {
        email: email,
        password: password,
      });

      const newResponse = JSON.stringify(response.data);
      saveToken(newResponse);
      
      // Handle the response from the server
      //console.log('reponse', newReesponse); // You might want to do something more meaningful here

      router.push('/');

    } catch (error) {
      // Handle errors
      console.error('Login failed:');

      
    }
  };


  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Connexion</h2>
      <form style={styles.form}>
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

         <label style={styles.label}>Mot de passe:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="button" onClick={handleLogin} style={styles.button}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    margin: 'auto',
    marginTop: '50px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  label: {
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    padding: '8px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default LoginForm;
