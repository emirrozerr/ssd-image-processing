const BASE_URL = 'http://localhost:5000';

const getAuthToken = () => localStorage.getItem('token');

/**
 * Register a new user.
 * @param {string} email - User's email.
 * @param {string} name - User's name.
 * @param {string} password - User's password.
 * @returns {Promise<Object>} - Response data.
 */
export const registerUser = async (email, name, password) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, password })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Log in a user.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<Object>} - Response data.
 */
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.accessToken) {
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('userID', data.user.id);
        }
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Upload an image for the current user.
 * @param {FormData} formData - FormData object containing the image file and name.
 * @returns {Promise<Object>} - Response data.
 */
export const loadImage = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/uploadImage`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Save a modified image associated with an original image.
 * @param {FormData} formData - FormData object containing the modified image file and the original image ID.
 * @returns {Promise<Object>} - Response data.
 */
export const saveModifiedImage = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/saveModifiedImage`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Log a process history record.
 * @param {number} originalImageID - ID of the original image.
 * @param {number} modifiedImageID - ID of the modified image.
 * @returns {Promise<Object>} - Response data.
 */
export const logProcessHistory = async (originalImageID, modifiedImageID) => {
    try {
        const response = await fetch(`${BASE_URL}/logProcessHistory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify({ originalImageID, modifiedImageID })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};
