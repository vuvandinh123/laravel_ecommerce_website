import { useState, useEffect } from 'react';
/**
 * Custom hook to handle API calls.
 *
 * @param {Function} apiFunction - The API function to be called.
 * @param {Array} deps - The dependency array for useEffect.
 * @param {Array} initialData - The initial data value.
 * @returns {Object} - An object containing the data, loading state, and error state.
 */
function useApiCall(apiFunction, deps = [], initialData = []) {
  const [data, setData] = useState(initialData); // State for storing the API response data
  const [loading, setLoading] = useState(false); // State for tracking the loading state
  const [error, setError] = useState(null); // State for storing any API error

  /**
   * useEffect hook to handle the API call and update the state accordingly.
   */
  useEffect(() => {
    setLoading(true); // Set loading state to true
    const fetchData = async () => {
      try {
        const response = await apiFunction(); // Call the API function
        setData(response); // Update the data state with the API response
        setError(null); // Reset the error state
      } catch (err) {
        setError(err); // Set the error state with the API error
      } finally {
        setLoading(false); // Set loading state to false
      }
    };
    setTimeout(() => {
      fetchData(); // Call fetchData after a 500ms delay
    }, 500);
  }, deps);

  return { data, loading, error }; // Return the data, loading state, and error state
}

export default useApiCall;
