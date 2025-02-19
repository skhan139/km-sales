import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from '../firebase'; // Import your Firebase configuration
import './UserProfile.css'; // Import the CSS file for styling
import { doc, getDoc, collection, addDoc, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions

const UserProfile = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (user) {
      // Fetch user data from Firestore
      const fetchUserData = async () => {
        try {
          console.log('Fetching user data for UID:', user.uid);
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            console.log('User data found:', userDoc.data());
            setUserData(userDoc.data());
          } else {
            console.error('No such document!');
            setError('No user data found.');
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Error fetching user data.');
        }
      };

      // Fetch invoices from Firestore
      const fetchInvoices = async () => {
        try {
          const invoicesCollectionRef = collection(db, 'users', user.uid, 'invoices');
          const invoicesSnapshot = await getDocs(invoicesCollectionRef);
          const invoicesList = invoicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setInvoices(invoicesList);
        } catch (err) {
          console.error('Error fetching invoices:', err);
          setUploadError('Error fetching invoices.');
        }
      };

      fetchUserData();
      fetchInvoices();
    }
  }, [user]);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setUploadError(null);
    } else {
      setUploadError('Please upload a valid PDF file.');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setUploadError(null);
    } else {
      setUploadError('Please upload a valid PDF file.');
    }
  };

  const handleSave = async () => {
    if (selectedFile) {
      try {
        const storageRef = ref(storage, `invoices/${user.uid}/${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(storageRef);
        await addDoc(collection(db, 'users', user.uid, 'invoices'), {
          name: selectedFile.name,
          url: downloadURL,
          uploadedAt: new Date(),
        });
        setInvoices([...invoices, { name: selectedFile.name, url: downloadURL }]);
        setSelectedFile(null);
        setUploadError(null);
      } catch (err) {
        console.error('Error uploading file:', err);
        setUploadError('Error uploading file.');
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="user-details">
        <p><strong>First Name:</strong> {userData.firstName}</p>
        <p><strong>Last Name:</strong> {userData.lastName}</p>
        <p><strong>Company Name:</strong> {userData.companyName}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
        <p><strong>Business Address:</strong> {userData.businessAddress}</p>
        <p><strong>City:</strong> {userData.city}</p>
        <p><strong>Zip Code:</strong> {userData.zipCode}</p>
        <p><strong>Organization Role:</strong> {userData.organizationRole}</p>
      </div>
      <div className="invoices-section">
        <h3>My Invoices</h3>
        <div
          className="drop-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p>Drag and drop your PDF invoices here</p>
        </div>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        {selectedFile && (
          <div>
            <p>Selected file: {selectedFile.name}</p>
            <button onClick={handleSave}>Save</button>
          </div>
        )}
        {uploadError && <p className="error-message">{uploadError}</p>}
        <ul className="invoices-list">
          {invoices.map((invoice) => (
            <li key={invoice.id}>
              <a href={invoice.url} target="_blank" rel="noopener noreferrer">
                {invoice.name}
              </a>
              <button onClick={() => window.open(invoice.url, '_blank')}>Download</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;