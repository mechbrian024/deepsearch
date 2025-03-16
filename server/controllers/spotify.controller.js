import errorHandler from "../helpers/dbErrorHandler.js";
import extend from "lodash/extend.js";

const token =
  "BQBfJBl95qtK7XqtCw4LnWDZpDlhqhssnWzYvRX22KhefMXdfOcVFAq5DEBqRWNd58H9Lr6QXrk2f16LnEJ5p4vQqqDrJiptTP9EhWMGXlVBj4K3lFAro03HfgBSFv97gFdkdVFnItVC-VqVsJvHu5hSChfcVDNajl0cKt9HzBvDLlT8Y0zNL9OAgkpF3ujoIVRkwfCNDb0NtFhtP0QjDgSW3_U9X9FwWMM2-5zks4OwHKbZtthrLD0llpeWMcSaei4ZknKaIviNTjy59Vl5sTNpP97lrv906w-X0Iy2NBoFg9CXC8sDh2gk";

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}

async function getTopTracks() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (
    await fetchWebApi("v1/me/top/tracks?time_range=long_term&limit=5", "GET")
  ).items;
}

const topTracks = await getTopTracks();

console.log(
  topTracks?.map(
    ({ name, artists }) =>
      `${name} by ${artists.map((artist) => artist.name).join(", ")}`
  )
);

const listTopTracks = async (req, res) => {
  try {
    res.json(topTracks);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { listTopTracks };
