/*
    Schema from mtgsqlive
*/
CREATE TABLE `sets` (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    baseSetSize INTEGER,
    block TEXT,
    boosterV3 TEXT,
    code VARCHAR(8) UNIQUE NOT NULL,
    codeV3 TEXT,
    isFoilOnly INTEGER,
    isForeignOnly INTEGER,
    isOnlineOnly INTEGER,
    isPartialPreview INTEGER,
    keyruneCode TEXT,
    mcmId INTEGER,
    mcmName TEXT,
    meta TEXT,
    mtgoCode TEXT,
    name TEXT,
    parentCode TEXT,
    releaseDate DATE,
    tcgplayerGroupId INTEGER,
    totalSetSize INTEGER,
    type TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `cards` (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    artist TEXT,
    borderColor TEXT,
    colorIdentity TEXT,
    colorIndicator TEXT,
    colors TEXT,
    convertedManaCost FLOAT,
    duelDeck TEXT,
    edhrecRank INTEGER,
    faceConvertedManaCost FLOAT,
    flavorText TEXT,
    frameEffect TEXT,
    frameEffects TEXT,
    frameVersion TEXT,
    hand TEXT,
    hasFoil INTEGER NOT NULL DEFAULT 0,
    hasNoDeckLimit INTEGER NOT NULL DEFAULT 0,
    hasNonFoil INTEGER NOT NULL DEFAULT 0,
    isAlternative INTEGER NOT NULL DEFAULT 0,
    isArena INTEGER NOT NULL DEFAULT 0,
    isBuyABox INTEGER NOT NULL DEFAULT 0,
    isDateStamped INTEGER NOT NULL DEFAULT 0,
    isFullArt INTEGER NOT NULL DEFAULT 0,
    isMtgo INTEGER NOT NULL DEFAULT 0,
    isOnlineOnly INTEGER NOT NULL DEFAULT 0,
    isOversized INTEGER NOT NULL DEFAULT 0,
    isPaper INTEGER NOT NULL DEFAULT 0,
    isPromo INTEGER NOT NULL DEFAULT 0,
    isReprint INTEGER NOT NULL DEFAULT 0,
    isReserved INTEGER NOT NULL DEFAULT 0,
    isStarter INTEGER NOT NULL DEFAULT 0,
    isStorySpotlight INTEGER NOT NULL DEFAULT 0,
    isTextless INTEGER NOT NULL DEFAULT 0,
    isTimeshifted INTEGER NOT NULL DEFAULT 0,
    layout TEXT,
    leadershipSkills TEXT,
    life TEXT,
    loyalty TEXT,
    manaCost TEXT,
    mcmId INTEGER,
    mcmMetaId INTEGER,
    mtgArenaId INTEGER,
    mtgoFoilId INTEGER,
    mtgoId INTEGER,
    multiverseId INTEGER,
    name TEXT,
    names TEXT,
    number TEXT,
    originalText TEXT,
    originalType TEXT,
    otherFaceIds TEXT,
    power TEXT,
    printings TEXT,
    purchaseUrls TEXT,
    rarity TEXT,
    scryfallId TEXT,
    scryfallIllustrationId TEXT,
    scryfallOracleId TEXT,
    setCode VARCHAR(8) NOT NULL,
    INDEX(setCode),
    FOREIGN KEY (setCode) REFERENCES sets(code) ON UPDATE CASCADE ON DELETE CASCADE,
    side TEXT,
    subtypes TEXT,
    supertypes TEXT,
    tcgplayerProductId INTEGER,
    text TEXT,
    toughness TEXT,
    type TEXT,
    types TEXT,
    uuid VARCHAR(36) UNIQUE NOT NULL,
    variations TEXT,
    watermark TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tokens` (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    artist TEXT,
    borderColor TEXT,
    colorIdentity TEXT,
    colors TEXT,
    isOnlineOnly INTEGER NOT NULL DEFAULT 0,
    layout TEXT,
    name TEXT,
    names TEXT,
    number TEXT,
    power TEXT,
    reverseRelated TEXT,
    scryfallId TEXT,
    scryfallIllustrationId TEXT,
    scryfallOracleId TEXT,
    setCode VARCHAR(8) NOT NULL,
    INDEX(setCode),
    FOREIGN KEY (setCode) REFERENCES sets(code) ON UPDATE CASCADE ON DELETE CASCADE,
    side TEXT,
    subtypes TEXT,
    supertypes TEXT,
    text TEXT,
    toughness TEXT,
    type TEXT,
    types TEXT,
    uuid VARCHAR(36) NOT NULL,
    watermark TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `prices` (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    price REAL,
    type TEXT,
    uuid VARCHAR(36) NOT NULL,
    INDEX(uuid),
    FOREIGN KEY (uuid) REFERENCES cards(uuid) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `rulings` (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    text TEXT,
    uuid VARCHAR(36) NOT NULL,
    INDEX(uuid),
    FOREIGN KEY (uuid) REFERENCES cards(uuid) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `legalities` (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    format TEXT,
    status TEXT,
    uuid VARCHAR(36) NOT NULL,
    INDEX(uuid),
    FOREIGN KEY (uuid) REFERENCES cards(uuid) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `set_translations` (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    language TEXT,
    setCode VARCHAR(8) NOT NULL,
    INDEX(setCode),
    FOREIGN KEY (setCode) REFERENCES sets(code) ON UPDATE CASCADE ON DELETE CASCADE,
    translation TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `foreign_data` (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    flavorText TEXT,
    language TEXT,
    multiverseId INTEGER,
    name TEXT,
    text TEXT,
    type TEXT,
    uuid VARCHAR(36) NOT NULL,
    INDEX(uuid),
    FOREIGN KEY (uuid) REFERENCES cards(uuid) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/*
    Codex Tables
*/
CREATE TABLE acceleration (
	cardId INTEGER,
    cycle VARCHAR(24),
    net VARCHAR(4),
    ramped VARCHAR(4),
    rank INT(2) UNSIGNED,
    style VARCHAR(24),
    synergies VARCHAR(255),

    PRIMARY KEY (cardId),
    FOREIGN KEY (cardId) REFERENCES cards(id)
);

CREATE TABLE stax (
	cardId INTEGER,
    rank INT(2) UNSIGNED,
    attacks VARCHAR(100),

    PRIMARY KEY (cardId),
    FOREIGN KEY (cardId) REFERENCES cards(id)
);

CREATE TABLE counters (
	cardId INTEGER,
    additionalCost VARCHAR(64),
    altCost INT(2),
    rank INT(2) UNSIGNED,
    targets VARCHAR(64),

    PRIMARY KEY (cardId),
    FOREIGN KEY (cardId) REFERENCES cards(id)
);

CREATE TABLE board_wipes (
	cardId INTEGER,
    playersAffected VARCHAR(16),
    rank INT(2) UNSIGNED,
    style VARCHAR(64),
    removes VARCHAR(64),
    timing VARCHAR(16),
    toughness VARCHAR(10),
    upsides VARCHAR(16),

    PRIMARY KEY (cardId),
    FOREIGN KEY (cardId) REFERENCES cards(id)
);

CREATE TABLE tutors (
	cardId INTEGER,
    finds VARCHAR(100),
    puts VARCHAR(100),
    quantity INT(2) UNSIGNED,
    rank INT(2) UNSIGNED,

    PRIMARY KEY (cardId),
    FOREIGN KEY (cardId) REFERENCES cards(id)
);

CREATE TABLE card_advantage (
	cardId INTEGER,
    fixed VARCHAR(100),
    rank INT(2) UNSIGNED,
    repeatsEach VARCHAR(100), # turn, activation, trigger
    style VARCHAR(100),

    PRIMARY KEY (cardId),
    FOREIGN KEY (cardId) REFERENCES cards(id)
);
