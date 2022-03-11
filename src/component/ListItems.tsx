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

export function ListItems({
  items,
  payload,
  component: Component,
}: {
  items: any[];
  payload?: any;
  component: Function;
}) {
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
