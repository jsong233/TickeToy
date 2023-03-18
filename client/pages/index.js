import buildClient from "../api/build-client";

const Landing = ({ currentUser }) => {
  return currentUser ? (
  <h1>You are signed in</h1> 
  ) : (
  <h1>You are not signed in</h1>
  );
};

// Most of the time, getInitialProps got executed on the server
// during the server side rendering (SSR) process.

// However, getInitialProps could also be executed on the client
// when navigating from one page to another while in the app.
Landing.getInitialProps = async (context) => {
  console.log('Landing Page!');
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  
  return data;
};

export default Landing;