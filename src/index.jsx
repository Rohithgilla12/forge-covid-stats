import api, { fetch } from "@forge/api";
import ForgeUI, {
  render,
  Fragment,
  Text,
  Macro,
  useProductContext,
  useState,
  Image,
  Table,
  Head,
  Row,
  Cell,
} from "@forge/ui";

const fetchCovidStats = async () => {
  const res = await (
    await fetch("https://coronavirus-19-api.herokuapp.com/countries")
  ).json();
  return res.slice(0, 10);
};

const App = () => {
  const context = useProductContext();
  const [stats] = useState(async () => await fetchCovidStats());
  return (
    <Fragment>
      <Image src="https://covid19.mathdro.id/api/og" alt="graph" />
      <Table>
        <Head>
          <Cell>
            <Text content="Country" />
          </Cell>
          <Cell>
            <Text content="Total" />
          </Cell>
          <Cell>
            <Text content="Recovered" />
          </Cell>
          <Cell>
            <Text content="Death" />
          </Cell>
        </Head>
        {stats.map((country) => (
          <Row>
            <Cell>
              <Text content={`${country.country}`} />
            </Cell>
            <Cell>
              <Text content={`${country.cases}`} />
            </Cell>
            <Cell>
              <Text content={`${country.recovered}`} />
            </Cell>
            <Cell>
              <Text content={`${country.deaths}`} />
            </Cell>
          </Row>
        ))}
      </Table>
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
