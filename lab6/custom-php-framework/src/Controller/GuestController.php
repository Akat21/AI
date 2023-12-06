<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Guest;
use App\Service\Router;
use App\Service\Templating;

class GuestController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $guests = Guest::findAll();
        $html = $templating->render('guest/index.html.php', [
            'guests' => $guests,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestGuest, Templating $templating, Router $router): ?string
    {
        if ($requestGuest) {
            $guest = Guest::fromArray($requestGuest);
            // @todo missing validation
            $guest->save();
            $path = $router->generatePath('guest-index');
            $router->redirect($path);
            return null;
        } else {
            $guest = new Guest();
        }

        $html = $templating->render('guest/create.html.php', [
            'guest' => $guest,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $guestId, ?array $requestGuest, Templating $templating, Router $router): ?string
    {
        $guest = Guest::find($guestId);
        if (! $guest) {
            throw new NotFoundException("Missing post with id $guestId");
        }

        if ($requestGuest) {
            $guest->fill($requestGuest);
            // @todo missing validation
            $guest->save();

            $path = $router->generatePath('guest-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('guest/edit.html.php', [
            'guest' => $guest,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $guestId, Templating $templating, Router $router): ?string
    {
        $guest = Guest::find($guestId);
        if (! $guest) {
            throw new NotFoundException("Missing post with id $guestId");
        }

        $html = $templating->render('guest/show.html.php', [
            'guest' => $guest,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $guestId, Router $router): ?string
    {
        $guest = Guest::find($guestId);
        if (! $guest) {
            throw new NotFoundException("Missing post with id $guestId");
        }

        $guest->delete();
        $path = $router->generatePath('guest-index');
        $router->redirect($path);
        return null;
    }
}
