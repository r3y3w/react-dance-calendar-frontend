import { useState, useEffect } from "react";
import { CardVenue } from "../components/CardVenue";
import { Container, Row, Col } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import Figure from "react-bootstrap/Figure";
import Image from "react-bootstrap/Image";
import Accordion from "react-bootstrap/Accordion";

const Home = () => {
  const [venuecollection, setVenueCollection] = useState([]);
  const [myDate, setMyDate] = useState(new Date());

  const [filterDate, setFilterDate] = useState(null);

  const HandleCalendarDate = (e) => {
    const year = e.getUTCFullYear();
    const day = e.getUTCDate();
    const month = e.getUTCMonth() + 1;

    const newDate = year + "-" + month + "-" + day;
    console.log("newDate -> ", newDate);
    setFilterDate(newDate);
  };

  // Render Mongo DB collection
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}`)
      .then((res) => res.json())
      .then((data) => setVenueCollection(data))
      .catch((err) => console.error(err));
    console.log("Getting Data");
    // console.log(venuecollection)
  }, []);
 
  const allVenuesDate = venuecollection
    .filter((venue) => venue.date === filterDate)
    .map((venue, index) => {
      return (
        <CardVenue
          key={venue._id}
          venue={venue}
          index={index}
          className="venue-item"
        />
      );
    });
  const filteredVenuesAll = (danceEvents) => {
    const items = venuecollection
      .filter(
        (item) => item.category === danceEvents
      )
      .map((venue, index) => (
        <CardVenue
          key={venue._id}
          venue={venue}
          index={index}
          className="venue-item"
        />
      ));
    return items;
  };
  console.log("filterDate ->", filterDate);

  const filteredVenues = (danceGenre, danceEvents) => {
    const items = venuecollection
      .filter(
        (item) => item.dance === danceGenre && item.category === danceEvents
      )
      .map((venue, index) => (
        <CardVenue
          key={venue._id}
          venue={venue}
          index={index}
          className="venue-item"
        />
      ));
    return items;
  };

  console.log("venuecollection ->", venuecollection);

  return (
    <div>
      <br />
      <Container>
        <Row>
          <Col>
            <Image
              fluid
              alt="171x180"
              src="https://rafael-reyes-bucket.s3.amazonaws.com/raf-final-image-1.jpg"
            />
            <h3 className="text-center"> Fun </h3>
          </Col>
          <Col>
            <Image
              fluid
              alt="171x180"
              src="https://rafael-reyes-bucket.s3.amazonaws.com/raf-final-image-3.jpg"
            />
            <h3 className="text-center"> Enjoy the Music</h3>
          </Col>
          <Col>
            <Image
              fluid
              alt="171x180"
              src="https://rafael-reyes-bucket.s3.amazonaws.com/raf-final-image-2.jpg"
            />
            <h3 className="text-center"> Live a Healthier Life </h3>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col className="column" xs={10}>
            <br />
            <br />
            <br />
            <Calendar onChange={HandleCalendarDate} value={myDate} />
            <Accordion>
              <Accordion.Item eventKey="6">
                <Accordion.Header>Eventes By Date</Accordion.Header>
                <Accordion.Body>
                  <div className="venues">{allVenuesDate}</div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="0">
                <Accordion.Header>All Dance Events</Accordion.Header>
                <Accordion.Body>
                  <div className="venues">{filteredVenuesAll("event")}</div>                  
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Salsa Events</Accordion.Header>
                <Accordion.Body>
                  <div className="venues">
                    {filteredVenues("Salsa", "event")}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Bachata Events</Accordion.Header>
                <Accordion.Body>
                  <div className="venues">
                    {filteredVenues("Bachata", "event")}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Kizomba Events</Accordion.Header>
                <Accordion.Body>
                {filteredVenues("Kizomba", "event")}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Ballroom Events</Accordion.Header>
                <Accordion.Body>
                {filteredVenues("Ballroom", "event")}
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="5">
                <Accordion.Header>Festivals</Accordion.Header>
                <Accordion.Body>
                {filteredVenues("Festival", "event")}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <br />
      <Container>
        <Row>
          <Col>
            <Image
              fluid
              title="Photo by Ray Lopez (raylopezphoto.com)"
              alt="Photo by Ray Lopez (raylopezphoto.com)"
              src="https://rafael-reyes-bucket.s3.amazonaws.com/merged-photo-01.webp"
            />
            <h3 className="text-center"> Fun </h3>
          </Col>

          <Col>
            <Image
              fluid
              title="Photo by Ray Lopez (raylopezphoto.com)"
              alt="Photo by Ray Lopez (raylopezphoto.com)"
              src="https://rafael-reyes-bucket.s3.amazonaws.com/merged-photo-02.webp"
            />
            <h3 className="text-center"> Enjoy the Music</h3>
          </Col>

          <Col>
            <Image
              fluid
              title="Photo by Ray Lopez (raylopezphoto.com)"
              alt="Photo by Ray Lopez (raylopezphoto.com)"
              src="https://rafael-reyes-bucket.s3.amazonaws.com/merged-photo-03.webp"
            />
            <h3 className="text-center"> Live a Healthier Life </h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
