<?php

/** @var \App\Model\Guest $guest */
/** @var \App\Service\Router $router */

$title = "{$guest->getName()} ({$guest->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $guest->getName() ?></h1>
    <article>
        <?= $guest->getContent();?>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('guest-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('guest-edit', ['id'=> $guest->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
