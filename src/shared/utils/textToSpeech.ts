const detectLanguage = (text: string): string => {
  if (/[\u4e00-\u9fa5]/.test(text)) return 'zh-CN'; // Chinese
  if (/[ぁ-んァ-ン]/.test(text)) return 'ja-JP'; // Japanese
  if (/[\u3130-\u318F\uAC00-\uD7A3]/.test(text)) return 'ko-KR'; // Korean
  if (/[\u0E00-\u0E7F]/.test(text)) return 'th-TH'; // Thai
  if (/[\u0900-\u097F]/.test(text)) return 'hi-IN'; // Hindi

  return 'en-US'; // fallback
};

export const textToSpeech = (text: string) => {
  const lang = detectLanguage(text);
  const utter = new SpeechSynthesisUtterance(text);

  const doSpeak = () => {
    const voices = speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang.startsWith(lang));
    if (voice) utter.voice = voice;

    utter.lang = lang;
    speechSynthesis.speak(utter);
  };

  if (speechSynthesis.getVoices().length === 0) {
    speechSynthesis.onvoiceschanged = doSpeak;
  } else {
    doSpeak();
  }
};
