import createElement from '../createElement';

const createFooter = () => {
  const footer = createElement('div','footer');
  const footerText = createElement('div','footer-text','Mark Melnik, 2023');
  footer.append(footerText);
  return footer;
}

export default createFooter;
