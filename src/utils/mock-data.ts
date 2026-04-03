import questionsData from "@/mock-data/questions.json";
import sessionResultData from "@/mock-data/session-result.json";
import userData from "@/mock-data/user.json";
import type { Question, SessionResult, User } from "@/types";

export function loadQuestions(): Question[] {
  return questionsData as Question[];
}

export function loadSessionResult(): SessionResult {
  return sessionResultData as SessionResult;
}

export function loadUser(): User {
  return userData as User;
}
