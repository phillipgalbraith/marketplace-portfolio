import axios from 'axios';

// A axios calls to protected data
// I had to turn axiosWithAuth into a function in order ot make redux work, sorry!
const axiosWithAuth = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URI,
    headers: {
      Authorization:
        typeof localStorage.getItem('token') === 'string'
          ? localStorage.getItem('token')
          : '',
    },
  });
};

// at '/owner'  load in the owner's items
// useEffect(() => {
//       setIsLoading = true;
//     axiosWithAuth
//       .get("apiURL/items")
//       .then(res => {
//         setItems(res.data);
//       })
//       .catch(error => console.log(error));
//   }, []);

export default axiosWithAuth;
