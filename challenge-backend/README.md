# End Points

## Clients

**All endpoints will expect a jwt**

- post: clients/auth/:email:password

  - expects
    - email
    - password
  - returns
    - jwt
  - _actions_
    - _need to determine if user is a client or agent. Probably just see if the agent_id is the same as the client_id_\_\*

- get: clients/:agent_id

  - expects
    - agent_id
  - returns array
    - agent_id
    - client_id
    - email
    - password
    - last used date
    - number of markers

- get: client/:client_id

  - expects
    - client_id
  - returns one

    - agent_id
    - client_id
    - name

- POST: users/upgrade-plan

  - expect
    - _id
    - product_id
    
  - returns
    - 200 success
    - 400 fail with reason

- put: clients/seats/assign/:agent_id:client_id:email:password

  - expects

    - agent_id
    - client_id
    - email
    - password

  - returns

    - agent_id
    - client_id
    - email
    - password

  - _actions_
    - _sends an email to client with login creds_

- put: clients/seats/unassign/:agent_id:client_id

  - expects

    - agent_id
    - client_id

  - returns
    - You freed up a seat for a new client but don't worry we saved all the markers this client used under your account.
  - _actions_
    - _We don't want to delete the map points but only remove the client_id and replace it with the agent_id_

## Markers

- get: markers/client/:agent_id:client_id

  - expects

    - agent_id
    - client_id

  - returns array
    - lng
    - lat
    - rating
    - client_id
    - aganet_id

- get: markers/agent/:agent_id

  - expects

    - agent_id

  - returns array
    - lng
    - lat
    - rating
    - client_id
    - aganet_id

- put: markers/client/:lng:lat:rating:agent_id:client_id

  - expects

    - lng
    - lat
    - rating
    - agent_id
    - client_id

  - returns
    - success
    - fail
  - _actions_
    - _We will need a way to prevent button mashing. Allow a marker a minute or something like that. This can be front end driven or in the api or both_

- put: markers/agent/:lng:lat:rating:agent_id
  - expects
    - lng
    - lat
    - rating
    - agent_id
  - returns
    - success
    - fail
  - _actions_
    - _We will need a way to prevent button mashing. Allow a marker a minute or something like that. This can be front end driven or in the api or both_
