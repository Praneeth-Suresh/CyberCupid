# CyberCupid

CyberCupid is a team design and app prototype exploring how dating apps could teach people to recognize scams. This is not a live dating service or a security product.

[View the Figma prototype](https://www.figma.com/proto/AdUATcNx7QBhDYFt6TvAVM/Brainhack_Codeexp_datingapp?node-id=2-1003&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1)

![CyberCupid home screen mockup](image.png)

## What to look at

- [Onboarding and demo sign-in screens](Ingress/)
- [Education screens](MainApp/Screens/EducationScreens.js) and [Security Dash](MainApp/Screens/GameComponents/SecurityDashGame.js)
- [Photo-selection UI](SetUp/PhotoUpload.js), which can request local camera or gallery permission

Authentication, identity verification, and scam protection are not implemented. Use fictional details and sample images only. Use the Figma walkthrough if you just want to see the design.

## Local development

With Node.js and npm installed, run from the repository root:

```bash
npm ci
npm start
```

This uses the Expo version recorded in the repository. Device or emulator behavior can depend on which native packages are available in the selected client.
