<img src="public/logo/unimi500.png" width="120" height="120" align="right" />

# [studentiunimi.it](https://studentiunimi.it/)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/) 
[![GitHub contributors](https://badgen.net/github/contributors/StudentiUniMi/website)](https://GitHub.com/StudentiUniMi/website/graphs/contributors/)
[![GitHub issues](https://img.shields.io/github/issues/StudentiUniMi/website)](https://github.com/StudentiUniMi/website/issues/)
[![telegram](./public/svg/telegram.svg)](https://t.me/studenti_unimi) 
[![React](./public/svg/react.svg)](https://it.reactjs.org/) 
[![typescript](./public/svg/typescript.svg)](https://www.typescriptlang.org/) 

[studentiunimi.it](https://studentiunimi.it/) is a fully responsive website built with React, [NextJS](https://nextjs.org/) and [Fluent UI](https://developer.microsoft.com/en-us/fluentui#/), with the aim of providing services and access to all groups of didactic courses and general purposes to students of the [University of Milan](https://www.unimi.it/). This website displays data and interacts with a database thanks to the APIs made available by the [backend](https://github.com/StudentiUniMi/backend).

![preview](public/images/preview.png)

# Run the project locally
1. Create a `.env.local` file in the root of the project:

   ```sh
   NEXT_PUBLIC_API_URL="http://localhost:8010/proxy"
   ```

2. Run the development server:

   ```sh
   npm run dev
   ```
   
The web application will be running at http://localhost:3000

# Contributors
<a href="https://github.com/StudentiUniMi/website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=StudentiUniMi/website" />
</a>