This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation

Install package service

```
  yarn install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` (for development) file or `.env.production` (for build version)

see example in .env.example file

`NEXT_PUBLIC_SERVICE_URL` backend service url (Ex. http://localhost:3001/api/v1)

## Start Application

develop version

```
  yarn dev
```

build version

```
  yarn build
  yarn start
```

## Packages in project

- axios - request backend services
- dayjs - convert date to proper format
- tailwindcss - css framework
- @heroicons/react - icon package
- @tailwindcss/line-clamp - tailwind plugin for truncating text

## Folder Structure

```
 src
    ├── app                       # page files
    ├── components                # component files
    ├── layouts                   # layout files
    ├── services                  # service files
    ├── utils                     # Tools and utilities
    ├── typing                    # Interface, Schema and other types
  ├── .env.production             # Production env file
  ├── .env.local                  # Develop env file
  └── README.md
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
