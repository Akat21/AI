<?php

/** @var \App\Model\Guest[] $guests */
/** @var \App\Service\Router $router */

$title = 'Guests List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Guests List</h1>

    <a href="<?= $router->generatePath('guest-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($guests as $guest): ?>
            <li><h3><?= $guest->getName() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('guest-show', ['id' => $guest->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('guest-edit', ['id' => $guest->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
