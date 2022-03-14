import styled from "styled-components";

export const UnorderedList = styled.ul`
  list-style: none;

  width: 100%;
  height: 100%;
  padding: 0;
`;

export const OrderedList = styled.ol`
  // styles
`;

interface ListItemsProps {
  items: any[];
  payload?: any;
  component: Function;
}

export function ListItems({
  items,
  payload,
  component: Component,
}: ListItemsProps) {
  return (
    <>
      {items.map((item, i) => (
        <li key={i}>
          <Component item={item} data={{ index: i, payload }} />
        </li>
      ))}
    </>
  );
}
