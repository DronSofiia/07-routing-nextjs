type Props = {
    children: React.ReactNode;
    sidebar: React.ReactNode;
  };
  
  const NotesLayout = ({ children, sidebar }: Props) => {
    return (
      <section style={{display: "flex"}}>
        <aside>{sidebar}</aside>
        <div>{children}</div>
      </section>
    );
  };
  
  export default NotesLayout;