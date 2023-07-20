import React, { useState } from "react";
import "./App.css";

const CreateUserForm = () => {
  // State to hold user data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    city: "",
    phoneNumber: []
  });

  // State to hold all users' details
  const [usersList, setUsersList] = useState([]);

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle adding a phone number
  const handleAddPhoneNumber = () => {
    setUserData((prevData) => ({
      ...prevData,
      phoneNumber: [...prevData.phoneNumber, ""]
    }));
  };

  // Handle phone number input changes
  const handlePhoneNumberChange = (index, value) => {
    setUserData((prevData) => {
      const updatedPhoneNumber = [...prevData.phoneNumber];
      updatedPhoneNumber[index] = value;
      return {
        ...prevData,
        phoneNumber: updatedPhoneNumber
      };
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you would make the actual API call using the userData
    // and handle the response accordingly. For simplicity, we'll simulate it.
    const successResponseMock = {
      name: userData.name,
      email: userData.email,
      city: userData.city,
      phoneNumber: userData.phoneNumber,
      id: `user_${new Date().getTime()}` // Generate a unique ID using timestamp
    };

    // Add the new user details to the usersList array
    setUsersList([...usersList, successResponseMock]);

    // Clear the form fields after successful submission
    setUserData({
      name: "",
      email: "",
      city: "",
      phoneNumber: []
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={userData.city}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone Numbers:
          <br />
          {userData.phoneNumber.map((number, index) => (
            <div key={index}>
              <input
                type="text"
                value={number}
                onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddPhoneNumber}>
            Add Phone Number
          </button>
        </label>
        <br />
        <button type="submit">Create User</button>
      </form>

      {/* Display a list of all users */}
      <div>
        <h2>All Users:</h2>
        {usersList.map((user, index) => (
          <div key={index}>
            <h3>User ID: {user.id}</h3>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateUserForm;
