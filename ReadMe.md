### Cross-namespace communication

To get all the existing namespaces:
`kubectl get namespace`
To get services existed inside of a particular namespace:
`kubectl get services -n name-of-namespace`

The request url to communicate with a service from a different namespace:
`http://name-of-service.name-of-namespace.svc.cluster.local`

To simplify the url, we could create the External Name Service.
