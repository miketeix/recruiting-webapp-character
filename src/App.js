import { useState, useMemo } from "react";
import { useImmer } from "use-immer";

import "./App.css";
import {
  ATTRIBUTE_LIST,
  CHARACTER_CLASS_MINIMUM_ATTRIBUTE_REQUIREMENTS_MAP,
  SKILL_LIST,
  MAX_ATTRIBUTE_COUNT,
} from "./consts.js";

function App() {
  const [num, setNum] = useState(0);
  const [selectedCharacterClass, showSelectedCharacterClass] = useState();

  const [attributes, updateAttributes] = useImmer(
    ATTRIBUTE_LIST.reduce((acc, attribute) => {
      acc[attribute] = 0;
      return acc;
    }, {})
    // Barbarian (for active character class testing purposes)
    // {
    //   Strength: 14,
    //   Dexterity: 9,
    //   Constitution: 9,
    //   Intelligence: 9,
    //   Wisdom: 9,
    //   Charisma: 9,
    // }
  );

  const playerAttributeCount = useMemo(
    () => Object.values(attributes).reduce((acc, value) => acc + value, 0),
    [attributes]
  );
  const activeCharacterClassMap = useMemo(
    () =>
      Object.entries(CHARACTER_CLASS_MINIMUM_ATTRIBUTE_REQUIREMENTS_MAP).reduce(
        (acc, [characterClassName, minumumAttributeRequirementsMap]) => {
          acc[characterClassName] = Object.entries(attributes).every(
            ([attribute, value]) =>
              value >= minumumAttributeRequirementsMap[attribute]
          );
          return acc;
        },
        {}
      ),

    [attributes]
  );
  console.log("activeCharacterClassMap", activeCharacterClassMap);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <h1>
          Attributes ({playerAttributeCount}/{MAX_ATTRIBUTE_COUNT})
        </h1>
        {Object.entries(attributes).map(([attribute, value], index) => (
          <div key={index}>
            {attribute}: &nbsp;
            {value} &nbsp;
            <button
              onClick={() =>
                updateAttributes((draft) => {
                  draft[attribute] = value - 1;
                })
              }
            >
              -
            </button>
            <button
              onClick={() =>
                updateAttributes((draft) => {
                  draft[attribute] = value + 1;
                })
              }
            >
              +
            </button>
          </div>
        ))}
      </section>
      <section className="App-section">
        <h1>Classes</h1>
        {Object.keys(CHARACTER_CLASS_MINIMUM_ATTRIBUTE_REQUIREMENTS_MAP).map(
          (characterClassName, index) => (
            <div>
              <button
                className={`character-class ${
                  activeCharacterClassMap[characterClassName]
                    ? "character-class-active"
                    : ""
                }`}
                onClick={() =>
                  showSelectedCharacterClass(
                    selectedCharacterClass === characterClassName
                      ? ""
                      : characterClassName
                  )
                }
              >
                {characterClassName}
              </button>
              {selectedCharacterClass === characterClassName ? (
                <ul className="class-requirements-list">
                  {Object.entries(
                    CHARACTER_CLASS_MINIMUM_ATTRIBUTE_REQUIREMENTS_MAP[
                      characterClassName
                    ]
                  ).map(([classAttribute, attributeValue], index) => (
                    <li key="index">
                      {classAttribute}: {attributeValue}
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
          )
        )}
      </section>
      <section className="App-section">
        <h1>Skills</h1>
      </section>
    </div>
  );
}

export default App;
