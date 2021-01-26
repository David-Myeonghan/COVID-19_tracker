# Deploying on Firebase

    - npm i firebase
    - firebase login
    - firebase init
        - hosting
        - using existing project
        - "build", not public
        - SPA: yes
    - npm run build
    - firebase deploy

# Enzyme

    - Need to install JEST v.24.9.0 first in this CRA version, using 'npm i --dev-sav jest@24.9.0'
    - mostly 'shallow'
    - shallow:

# Context API

    - Using Context API, we don't actually need to use Redux for state management.
    - https://www.youtube.com/watch?v=35lXWvCuM8o&ab_channel=DevEd
    - Downside: Every Component using Context API will be rendered again when somthing in the context is changed.
