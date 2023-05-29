import createElement from '../createElement';

const createHeader = () => {
  const header = createElement('div','header');
  const headerText = createElement('div','header-text','Battleship');
  header.append(headerText);
  return header;
}

export default createHeader;
