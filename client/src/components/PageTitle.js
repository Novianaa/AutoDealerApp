import { Helmet } from "react-helmet";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} - Lewis's Vroom</title>
    </Helmet>
  );
};

export default PageTitle;