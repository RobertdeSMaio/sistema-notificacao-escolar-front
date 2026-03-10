export const falar = (texto: string) => {
  window.speechSynthesis.cancel();

  const mensagem = new SpeechSynthesisUtterance(texto);
  mensagem.lang = "pt-BR";
  mensagem.rate = 1.2;

  window.speechSynthesis.speak(mensagem);
};
