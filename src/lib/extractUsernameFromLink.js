export const extractUsernameFromLink = (link) => {
  const match = link.match(/t\.me\/([a-zA-Z0-9_]+)/);
  return match ? match[1] : null;
}