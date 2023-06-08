import axios from 'axios';

export default async function login(req, res) {
  const validUserGroups = ['1'];
  console.log(process.env.XF_API_URL);
  if (req.method === 'POST') {
    const userLoginData = req.body;

    const options = {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'XF-Api-Key': process.env.TOOLS_API_KEY,
        'XF-Api-User': process.env.TOOLS_API_USER,
      },
      referrerPolicy: 'origin-when-cross-origin',
    };

    if (userLoginData.fetch) {
      const response = await fetch('https://pointsixtyfive.com/xenforo/api/auth', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'XF-Api-Key': process.env.TOOLS_API_KEY,
          'XF-Api-User': process.env.TOOLS_API_USER,
        },
        referrerPolicy: 'origin-when-cross-origin',
        body: JSON.stringify({ username: 'fq', password: 'shrek' }),
      });
      res.status(200).send({ msg: 'FETCH API WORKS' });
    } else {
      const data = await axios
        .post(`https://pointsixtyfive.com/xenforo/api/auth`, userLoginData, options)
        .then((response) => {
          console.log(response.data);
        })

        .catch((e) => {
          if (e.response.status === 400) {
            res
              .status(e.response.status)
              .send({ message: 'There was an error logging in. Make sure the username/password is correct.' });
            return;
          }

          if (e.request) {
            res.status(e.request.status).send({ message: 'There was an error with the request.' });
            return;
          }
        });
      res.status(200).send({ msg: 'AXIOS WORKS' });
    }

    // if (data?.user.secondary_group_ids.length === 0) {
    //   res.status(401).send({ message: 'You do not have permission to view this content.' });
    //   return;
    // }

    // const userGroups = data?.user.secondary_group_ids.filter((id) => validUserGroups.includes(id));
    // const userInfo = {
    //   email: data.user.email,
    //   gravatar: data.user.gravatar,
    //   userName: data.user.username,
    // };

    // if (!userGroups.length) {
    //   res.status(401).send({ message: 'You do not have permission to view this content.' });
    //   return;
    // } else {
    //   res.status(200).send({ userGroups, userInfo });
    //   return;
    // }
  }

  // if (req.method !== 'POST') {
  //   res.status(405).send({ message: 'This method is not allowed.' });
  // }
}
