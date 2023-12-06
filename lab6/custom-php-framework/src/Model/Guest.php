<?php
namespace App\Model;

use App\Service\Config;

class Guest
{
    private ?int $id = null;
    private ?string $name = null;
    private ?string $content = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Guest
    {
        $this->id = $id;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): Guest
    {
        $this->name = $name;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): Guest
    {
        $this->content = $content;

        return $this;
    }

    public static function fromArray($array): Guest
    {
        $guest = new self();
        $guest->fill($array);

        return $guest;
    }

    public function fill($array): Guest
    {
        if (isset($array['id']) && ! $this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['name'])) {
            $this->setName($array['name']);
        }
        if (isset($array['content'])) {
            $this->setContent($array['content']);
        }

        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM guest';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $guests = [];
        $guestsArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($guestsArray as $guestArray) {
            $guests[] = self::fromArray($guestArray);
        }

        return $guests;
    }

    public static function find($id): ?Guest
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM guest WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $guestArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (! $guestArray) {
            return null;
        }
        $guest = Guest::fromArray($guestArray);

        return $guest;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (! $this->getId()) {
            $sql = "INSERT INTO guest (name, content) VALUES (:name, :content)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'name' => $this->getName(),
                'content' => $this->getContent(),
            ]);

            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE guest SET name = :name, content = :content WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':name' => $this->getName(),
                ':content' => $this->getContent(),
                ':id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM guest WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => $this->getId(),
        ]);

        $this->setId(null);
        $this->setName(null);
        $this->setContent(null);
    }
}
