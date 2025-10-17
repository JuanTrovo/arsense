DROP FUNCTION IF EXISTS mac_str_to_bin;

DELIMITER $$


CREATE FUNCTION IF NOT EXISTS mac_str_to_bin(mac_str CHAR(17)) RETURNS BINARY(6)
DETERMINISTIC
BEGIN
    DECLARE mac_clean CHAR(12);

    -- Remove os dois pontos ":" do endereço MAC
    SET mac_clean = REPLACE(mac_str, ':', '');

    -- Retorna os 6 bytes em formato binário (hex -> bin)
    RETURN UNHEX(mac_clean);
END $$

DELIMITER ;