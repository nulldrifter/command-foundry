# sourced via mtgjson.com, ref: https://mtgjson.com/files/all-cards/
CREATE TABLE cards (
	cardId INT(4) UNSIGNED NOT NULL AUTO_INCREMENT,
    colorIdentity VARCHAR(10) NOT NULL,
    colors VARCHAR(10) NOT NULL,
    convertedManaCost DECIMAL(4,2) UNSIGNED NOT NULL,
    edhrec INT(4),
    manaCost VARCHAR(20) NOT NULL,
    multiverseId INT(4) UNSIGNED,
    name VARCHAR(64) NOT NULL,
    printings VARCHAR(100) NOT NULL,
    rarity VARCHAR(20) NOT NULL,
    scryfallId VARCHAR(64),
    scryfallIllustrationId VARCHAR(64),
    scryfallOracleId VARCHAR(64),
    subtypes VARCHAR(50),
    supertypes VARCHAR(50),
    tcgplayerProductId INT(4) UNSIGNED,
    text VARCHAR(255),
    type VARCHAR(100) NOT NULL,

    PRIMARY KEY (cardId)
);

CREATE TABLE acceleration (
	cardId INT(4) UNSIGNED,
    cycle VARCHAR(24),
    net VARCHAR(4),
    ramped VARCHAR(4),
    rank INT(2) UNSIGNED,
    style VARCHAR(24),
    synergies VARCHAR(255),

    PRIMARY KEY (cardId),
    FOREIGN KEY (cardId) REFERENCES cards(cardId)
);

CREATE TABLE stax (
	cardId INT(4) UNSIGNED,
    rank INT(2) UNSIGNED,
    targets VARCHAR(100),

    PRIMARY KEY (cardId),
    FOREIGN KEY (cardId) REFERENCES cards(cardId)
);

CREATE TABLE counters (
	cardId INT(4) UNSIGNED,
    additionalCost VARCHAR(64),
    altCost INT(2),
    rank INT(2) UNSIGNED,
    targets VARCHAR(64),

    PRIMARY KEY (cardId),
    FOREIGN KEY (cardId) REFERENCES cards(cardId)
);

CREATE TABLE board_wipes (
	cardId INT(4) UNSIGNED,
    playersAffected VARCHAR(16),
    rank INT(2) UNSIGNED,
    style VARCHAR(64),
    targets VARCHAR(64),
    timing VARCHAR(16),
    toughness VARCHAR(10),
    upsides VARCHAR(16),

    PRIMARY KEY (cardId),
    FOREIGN KEY (cardId) REFERENCES cards(cardId)
);

CREATE TABLE tutors (
	cardId INT(4) UNSIGNED,
    finds VARCHAR(100),
    puts VARCHAR(100),
    quantity INT(2) UNSIGNED,
    rank INT(2) UNSIGNED,

    PRIMARY KEY (cardId),
    FOREIGN KEY (cardId) REFERENCES cards(cardId)
);

CREATE TABLE card_advantage (
	cardId INT(4) UNSIGNED,
    fixed VARCHAR(100),
    rank INT(2) UNSIGNED,
    repeatsEach VARCHAR(100), # turn, activation, trigger
    style VARCHAR(100),

    PRIMARY KEY (cardId),
    FOREIGN KEY (cardId) REFERENCES cards(cardId)
);
