export const badgeColor = (text: string) => {
  switch (true) {
    case /9[\d]{2}.*/.test(text):
      return "success";
    case /3[\d]{2}.*/.test(text):
      return "brand";
    default:
      return "danger";
  }
};
