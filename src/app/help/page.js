import "./help.css";

function App() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="FAQ.css" />
        <title>User Help Section</title>
      </head>

      <body
        className="h-[100vh] p-[1px] overflow-y-scroll"
        style={{ background: "radial-gradient(#7ae6f0, rgb(255, 255, 255))" }}
      >
        <div className="FAQmodal-parent">
          <div className="FAQheading-of-modal">
            <p className="FAQmodal-heading-p">User Help Section</p>
          </div>
          <div className="FAQmodal-content">
            <br />
            <div className="FAQfade_rule-modal"></div>
            <div className="FAQmodal-external-content">
              <div className="questionFAQ">Introduction</div>
              <br />
              <div className="answerFAQ">
                Welcome to the help section!This guide provides comprehensive
                information on various features and functionalities to assist
                users in navigating and utilizing the platform effectively.
              </div>
            </div>
            <div className="FAQfade_rule-modal"></div>
            <br />
          </div>
          <div className="FAQmodal-content">
            <br />
            <div className="FAQfade_rule-modal"></div>
            <div className="FAQmodal-external-content">
              <div className="questionFAQ">User Stats: Overview</div>
              <br />
              <div className="answerFAQ">
                View statistics on the number of working motors, faulty motors,
                and motors with issues.
              </div>
            </div>
            <div className="FAQfade_rule-modal"></div>
            <br />
          </div>
          <div className="FAQmodal-content">
            <br />
            <div className="FAQfade_rule-modal"></div>
            <div className="FAQmodal-external-content">
              <div className="questionFAQ">Motor Information: Motor Table</div>
              <br />
              <div className="answerFAQ">
                Access a detailed table displaying information about motors,
                including Motor ID, Motor Status, Motor Type, Motor Created At,
                and Health Card details. Motor Status provides an overview of
                working and faulty motors.
              </div>
            </div>
            <div className="FAQfade_rule-modal"></div>
            <br />
          </div>
          <div className="FAQmodal-content">
            <br />
            <div className="FAQfade_rule-modal"></div>
            <div className="FAQmodal-external-content">
              <div className="questionFAQ">Motor Information: Health Card</div>
              <br />
              <div className="answerFAQ">
                Explore the Health Card feature, presenting recent data on motor
                functioning, including time and date, current, frequency, and
                fault frequency. Identify Fault Types, such as Broken Rotor Bar,
                Broken End Ring, Eccentricity, Bearing Fault, and Inter-turn
                Short Circuit, along with their occurrences over the last 1
                week, 1 month, and 1 year. View the Remaining Useful Life of
                motors. Access real-time and historical graphs depicting current
                versus time and frequency versus time for the past 1 day, week,
                month, and year.
              </div>
            </div>
            <div className="FAQfade_rule-modal"></div>
            <br />
          </div>
          <div className="FAQmodal-content">
            <br />
            <div className="FAQfade_rule-modal"></div>
            <div className="FAQmodal-external-content">
              <div className="questionFAQ">All Motors</div>
              <br />
              <div className="answerFAQ">
                Utilize a search form for filtering and sorting motors based on
                criteria such as search keywords, status, and motor type. Sort
                motors based on latest, oldest, A-Z, and Z-A criteria.
              </div>
            </div>
            <div className="FAQfade_rule-modal"></div>
            <br />
          </div>
          <div className="FAQmodal-content">
            <br />
            <div className="FAQfade_rule-modal"></div>
            <div className="FAQmodal-external-content">
              <div className="questionFAQ">Search and Sorting</div>
              <br />
              <div className="answerFAQ">
                Profile Access detailed information about the logged-in user's
                profile, including First Name, Last Name, Email, and Location.
              </div>
            </div>
            <div className="FAQfade_rule-modal"></div>
            <br />
          </div>
          <div className="FAQmodal-content">
            <br />
            <div className="FAQfade_rule-modal"></div>
            <div className="FAQmodal-external-content">
              <div className="questionFAQ">About Us</div>
              <br />
              <div class="answerFAQ">
                Learn more about the team behind and GAIL by clicking on the
                link{" "}
                <a
                  href="https://en.wikipedia.org/wiki/GAIL"
                  target="_blank"
                  rel="noreferrer"
                >
                  GAIL
                </a>
                . Get insights into the development team and the vision behind
                the platform.
              </div>
            </div>
            <div className="FAQfade_rule-modal"></div>
            <br />
          </div>
        </div>
      </body>
    </html>
  );
}

export default App;
