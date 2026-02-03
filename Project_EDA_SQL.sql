-- Pregunta 1: Ranking de peliculas por Popularidad por género
WITH PelisPorGenero AS (
    SELECT
        g.id        AS id_genero,
        g.name      AS genero,
        p.id        AS id_pelicula,
        p.title     AS titulo_pelicula,
        p.popularity,
        ROW_NUMBER() OVER (
            PARTITION BY g.id
            ORDER BY p.popularity DESC
        ) AS ranking_popularidad
    FROM pelicula p
    JOIN genero_pelicula pg
        ON p.id = pg.id_pelicula
    JOIN generos g
        ON pg.id_genero = g.id
)
SELECT
    genero,
    id_pelicula,
    titulo_pelicula,
    popularity,
    ranking_popularidad
FROM PelisPorGenero
ORDER BY
    genero,
    ranking_popularidad;
    
-- Pregunta 2: El actor que más aparece por cada género de películas

WITH Apariciones AS (
    SELECT
        g.id        AS id_genero,
        g.name      AS genero,
        pe.id       AS id_actor,
        pe.name     AS nombre_actor,
        COUNT(*)    AS num_apariciones
    FROM generos g
    JOIN genero_pelicula pg
        ON g.id = pg.id_genero
    JOIN pelicula p
        ON pg.id_pelicula = p.id
    JOIN cast c
        ON p.id = c.id_pelicula
    JOIN personas pe
        ON c.id_persona = pe.id
    GROUP BY
        g.id,
        g.name,
        pe.id,
        pe.name
),
ActorTopGenero AS (
    SELECT
        id_genero,
        genero,
        id_actor,
        nombre_actor,
        num_apariciones,
        ROW_NUMBER() OVER (
            PARTITION BY id_genero
            ORDER BY num_apariciones DESC
        ) AS actor_rank
    FROM Apariciones
)
SELECT
    genero,
    id_actor,
    nombre_actor,
    num_apariciones
FROM ActorTopGenero
WHERE actor_rank = 1
ORDER BY num_apariciones desc, genero;


-- Pregunta 3: Ranking de peliculas por popularidad de los actores
SELECT
    p.title AS titulo_pelicula,
    AVG(pe.popularity) AS popularidad_media_actores
FROM
    pelicula p
JOIN
    cast c ON p.id = c.id_pelicula
JOIN
    personas pe ON c.id_persona = pe.id
GROUP BY
    p.id, p.title
ORDER BY
    popularidad_media_actores DESC
LIMIT 10;

-- Pregunta 4: Década más popular
SELECT 
    (YEAR(release_date) DIV 10) * 10 AS decade,
    AVG(popularity) as popularity,
     AVG(vote_average) as vote_average
FROM pelicula
GROUP BY decade
ORDER BY decade;

-- Pregunta 5: De cada película popular, el actor con mayor popularidad y el personaje que hizo

SET @avg_popularity = (SELECT AVG(popularity) FROM pelicula);

WITH ActorRanked AS (
    SELECT
        p.title AS titulo_pelicula,
        p.popularity AS popularidad_pelicula,
        pe.name AS nombre_actor,
        pe.popularity AS popularidad_actor,
        c.character as personaje,
        -- Asigna un número de fila (rank) a los actores dentro de cada película,
        -- ordenados por su popularidad de forma descendente.
        ROW_NUMBER() OVER(PARTITION BY p.id ORDER BY pe.popularity DESC) AS actor_rank
    FROM
        pelicula p
    JOIN
        cast c ON p.id = c.id_pelicula
    JOIN
        personas pe ON c.id_persona = pe.id
    WHERE
        p.popularity > @avg_popularity -- Filtra solo las películas populares (popularidad > media global)
)
SELECT
    titulo_pelicula,
    popularidad_pelicula,
    nombre_actor,
    popularidad_actor,
    personaje
FROM
    ActorRanked
WHERE
    actor_rank = 1 -- Selecciona solo el actor con el ranking más alto (mayor popularidad)
    order by popularidad_pelicula desc
LIMIT 20;

-- Pregunta 6: Género más destacado en cada década
WITH popularidad_genero_decada AS (
    SELECT
        (YEAR(p.release_date) DIV 10) * 10 AS decada,
        g.id                                    AS id_genero,
        g.name                                AS genero,
        AVG(p.popularity)                      AS avg_popularidad_genero
    FROM pelicula p
    JOIN genero_pelicula gp ON gp.id_pelicula = p.id
    JOIN generos g          ON g.id = gp.id_genero
    WHERE p.release_date IS NOT NULL
    GROUP BY (YEAR(p.release_date) DIV 10) * 10, g.id, g.name
),
ranking_generos AS (
    SELECT
        decada,
        id_genero,
        genero,
        avg_popularidad_genero,
        ROW_NUMBER() OVER (
            PARTITION BY decada
            ORDER BY avg_popularidad_genero DESC
        ) AS rn
    FROM popularidad_genero_decada
)
SELECT
    decada,
    id_genero,
    genero,
    avg_popularidad_genero
FROM ranking_generos
WHERE rn = 1
ORDER BY decada;

-- Pregunta 7: Mejor película en cada año
WITH ranking_pelis AS (
    SELECT
        YEAR(p.release_date)  AS anio,
        p.id,
        p.title,
        p.vote_average,
        p.vote_count,
        ROW_NUMBER() OVER (
            PARTITION BY YEAR(p.release_date)
            ORDER BY p.vote_average DESC, p.vote_count DESC
        ) AS rn
    FROM pelicula p
    WHERE p.release_date IS NOT NULL
)
SELECT
    anio,
    id,
    title,
    vote_average,
    vote_count
FROM ranking_pelis
WHERE rn = 1
ORDER BY anio;

-- Pregunta 8: Proporción de media de votos (vote_average) con cantidad de votos con un mínimo de 1000 votos 

		SELECT
			p.id,
			p.title,
			p.vote_average,
			p.vote_count,
			(p.vote_average / p.vote_count) AS ratio_voto_promedio_por_voto
		FROM pelicula p
		WHERE p.vote_count >= 1000
		ORDER BY ratio_voto_promedio_por_voto DESC;

-- Pregunta 9: Proporción de media de votos (vote_average) con cantidad de votos con un mínimo de x votos. Relacionado con la popularity 
		SET @C = (SELECT AVG(vote_average) FROM pelicula);
		-- M (Votos mínimos requeridos, umbral de confianza)
		SET @M = 2000;

		-- 2. Calcular la Puntuación Ponderada (Weighted Rating)
		SELECT
			title,
			popularity,
			vote_average,
			vote_count,
			-- weighted_rating = (v / (v+m) * R) + (m / (v+m) * C)
			(((vote_count) / (vote_count + @M)) * vote_average)
			+
			((@M / (vote_count + @M)) * @C) AS weighted_rating
		FROM
			pelicula
		WHERE
			vote_count >= @M -- Aplicar el filtro de votos mínimos (las únicas que se consideran "calificadas")
		ORDER BY
			weighted_rating DESC, -- Prioridad principal: Calidad ponderada
			popularity DESC      -- Prioridad secundaria: Popularidad
		LIMIT 10;

-- Pregunta 10: Media de edad en la que salen los actores en las películas relacionado con la media de popularidad de las películas
SELECT
    pe.id   AS id_actor,
    pe.name AS nombre_actor,
    AVG(
        TIMESTAMPDIFF(
            YEAR,
            pe.birthday,
            p.release_date
        )
    ) AS edad_media,
    AVG(p.popularity) AS popularidad_media_peliculas
FROM cast c
JOIN personas pe
    ON c.id_persona = pe.id
JOIN pelicula p
    ON c.id_pelicula = p.id
WHERE
    pe.birthday IS NOT NULL
    AND p.release_date IS NOT NULL
GROUP BY
    pe.id,
    pe.name
ORDER BY
    popularidad_media_peliculas desc;
    
-- Pregunta alternativa: Comparar la popularidad del personaje con la popularidad del actor


