import apiURL from "./config.js";

export default {
  // makes a request to register a new user
  registerUser: async (registrationInfo) => {
    try {
      console.log("api url:", apiURL);
      const response = await fetch(apiURL + "users/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(registrationInfo),
      });
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error) {
      // TODO - handle this error
      console.log("error occurred during registration:", error);
    }
  },

  // makes api request to login a user
  loginUser: async (loginInfo) => {
    try {
      const response = await fetch(apiURL + "users/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(loginInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error) {
      // TODO - handle this error
      console.log("error occurred during login:", error);
    }
  },

  confirmPhoneNumber: async (confirmationCode) => {
    const requestBody = {
      confirmation_code: confirmationCode,
    };

    try {
      const response = await fetch(apiURL + "users/confirm-number", {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const parsedResponse = await response.json(requestBody);
      return parsedResponse;
    } catch (error) {
      // TODO - handle this error
      console.log("error occurred during login:", error);
    }
  },

  // makes a request to logout a user
  logoutUser: async () => {
    try {
      const response = await fetch(apiURL + "users/logout", {
        method: "POST",
        credentials: "include",
      });
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error) {
      // TODO - handle this error
      console.log("error occurred while logging out:", error);
    }
  },

  resetPassword: async (phoneNumber) => {
    try {
      const response = await fetch(apiURL + "users/reset-password", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(phoneNumber),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const parsedResponse = await response.json();

      return parsedResponse;
    } catch (error) {
      console.log("error occurred while logging out:", error);
    }
  },
};
