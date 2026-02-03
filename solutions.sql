-- Query 1 -- 
SELECT 
    s.store_id       AS store_id,
    ci.city          AS city,
    co.country       AS country
FROM store s
JOIN address a   ON s.address_id = a.address_id
JOIN city ci     ON a.city_id = ci.city_id
JOIN country co  ON ci.country_id = co.country_id;

-- Query 2 -- 
SELECT 
    s.store_id,
    SUM(p.amount) AS total_sales
FROM payment p
JOIN staff st ON p.staff_id = st.staff_id
JOIN store s  ON st.store_id = s.store_id
GROUP BY s.store_id;

-- Query 3 --
SELECT 
    c.name       AS category,
    AVG(f.length) AS avg_length
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c       ON fc.category_id = c.category_id
GROUP BY c.category_id, c.name
ORDER BY c.name;

-- Query 4 -- 
SELECT 
    c.name        AS category,
    AVG(f.length) AS avg_length
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c       ON fc.category_id = c.category_id
GROUP BY c.category_id, c.name
ORDER BY avg_length DESC;

-- Query 5 -- 
SELECT 
    f.film_id,
    f.title,
    COUNT(*) AS rental_count
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f      ON i.film_id = f.film_id
GROUP BY f.film_id, f.title
ORDER BY rental_count DESC;

-- Query 6 -- 
SELECT 
    c.name       AS category,
    SUM(p.amount) AS gross_revenue
FROM payment p
JOIN rental r        ON p.rental_id = r.rental_id
JOIN inventory i     ON r.inventory_id = i.inventory_id
JOIN film f          ON i.film_id = f.film_id
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c       ON fc.category_id = c.category_id
GROUP BY c.category_id, c.name
ORDER BY gross_revenue DESC
LIMIT 5;

-- Query 7 -- 
SELECT 
    CASE 
        WHEN COUNT(*) > 0 THEN 'YES'
        ELSE 'NO'
    END AS is_available
FROM inventory i
JOIN film f 
    ON i.film_id = f.film_id
LEFT JOIN rental r
    ON i.inventory_id = r.inventory_id
    AND r.return_date IS NULL     
WHERE f.title = 'ACADEMY DINOSAUR'
  AND i.store_id = 1
  AND r.rental_id IS NULL;       



 
