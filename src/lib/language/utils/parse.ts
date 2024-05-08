const parse = (text: string, placeholders: Record<any, any> = {}) => {
  let parsedText = text;
  Object.entries(placeholders).forEach(([key, value]) => {
    parsedText = parsedText.replace(new RegExp(`{${key}}`, 'g'), value);
  });
  return parsedText;
}	

export default parse;