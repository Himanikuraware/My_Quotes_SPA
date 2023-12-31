export async function getAllQuotes() {
  const response = await fetch(
    `${process.env.REACT_APP_FIREBASE_URL}/quotes.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}

export async function getSingleQuote(quoteId) {
  const response = await fetch(
    `${process.env.REACT_APP_FIREBASE_URL}/quotes/${quoteId}.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quote.");
  }

  const loadedQuote = {
    id: quoteId,
    ...data,
  };

  return loadedQuote;
}

export async function addQuote(quoteData) {
  const response = await fetch(
    `${process.env.REACT_APP_FIREBASE_URL}/quotes.json`,
    {
      method: "POST",
      body: JSON.stringify(quoteData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create quote.");
  }

  return null;
}

export async function addComment(requestData) {
  const response = await fetch(
    `${process.env.REACT_APP_FIREBASE_URL}/comments/${requestData.quoteId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.commentData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment.");
  }

  return { commentId: data.name };
}

export async function getAllComments(quoteId) {
  const response = await fetch(
    `${process.env.REACT_APP_FIREBASE_URL}/comments/${quoteId}.json`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get comments.");
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}

export async function getUserData(userToken) {
  const response = await fetch(process.env.REACT_APP_FIREBASE_GET_USER_DATA, {
    method: "POST",
    body: JSON.stringify({
      idToken: userToken,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get user data.");
  }

  return data;
}

export async function loginUser(email, password) {
  const url = process.env.REACT_APP_FIREBASE_LOGIN_LINK;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Authentication failed!");
  }

  return data;
}

export async function signupUser(email, password) {
  const url = process.env.REACT_APP_FIREBASE_SIGNUP_LINK;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Signup failed!");
  }

  return data;
}

export async function changePassword(idToken, newPassword) {
  const url = process.env.REACT_APP_FIREBASE_CHANGE_PASSWORD_LINK;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      idToken,
      password: newPassword,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Password change failed!");
  }

  return data;
}