import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server
    // When making request from the server instead of the browser
    // the environment is a Kubernetes container instead of local machine
    // To fix this, we reach out back to Ingress Nginx
    // this requires corss-namespace communication
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // We are on the browser
    return axios.create({
      baseUrl: '/',
    });
  }
};

export default buildClient;