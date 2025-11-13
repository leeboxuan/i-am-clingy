import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

// 💞 Constants for easy customization
const FUNNY_WORDS = [
  "hug", "sob", "uwu", "bby", "pls", "mine", "snug", "ily", "clngy", "srry",
];

const CHAR_POOL = "abcdefghijklmnopqrstuvwxyz0123456789";
const SUFFIX_MIN = 2;
const SUFFIX_MAX = 3;

// 🧠 Helper functions
function randomSuffix(length = 3) {
  return Array.from({ length }, () => CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)]).join("");
}

function generateFriendCode() {
  const word = FUNNY_WORDS[Math.floor(Math.random() * FUNNY_WORDS.length)];
  const suffixLen = SUFFIX_MIN + Math.floor(Math.random() * (SUFFIX_MAX - SUFFIX_MIN + 1));
  return `${word}${randomSuffix(suffixLen)}`;
}

// 🔒 Ensure unique code in Firestore
export async function generateUniqueFriendCode() {
  let code, exists = true;
  while (exists) {
    code = generateFriendCode();
    const q = query(collection(db, "users"), where("friendCode", "==", code));
    const snap = await getDocs(q);
    exists = !snap.empty;
  }
  return code;
}
